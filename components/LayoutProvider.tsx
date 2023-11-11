"use client"
import { setCurrentUser } from "@/redux/usersSlice"
import { ConfigProvider, message } from "antd"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./Loading"
import { setIsLoading } from "@/redux/loadingsSlice"

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { currentUser } = useSelector((state: any) => state.users)
  const { isLoading } = useSelector((state: any) => state.loadings)

  const [menuItems, setMenuItems] = useState([
    {
      title: "Home",
      path: "/",
      icon: "ri-home-7-line",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: "ri-user-3-line",
    },
    {
      title: "Applications",
      path: "/applications",
      icon: "ri-file-list-3-line",
    },
    {
      title: "Settings",
      path: "/settings",
      icon: "ri-settings-4-line",
    },
    {
      title: "Saved",
      path: "/saved",
      icon: "ri-save-line",
    },
  ])

  const dispatch = useDispatch()

  const router = useRouter()

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true)

  const pathname = usePathname()

  // const [jwtExpired, setJwtExpired] = useState<boolean>(false)
  // const notificationDisplayedRef = useRef<boolean>(false)

  // useEffect(() => {
  //   async function checkJwtStatus() {
  //     try {
  //       const res = await axios.get("api/jwt")
  //       if (res.status === 200) {
  //         setJwtExpired(false) // O JWT é válido
  //       }
  //     } catch (error: any) {
  //       if (error.res && error.res.status === 401) {
  //         setJwtExpired(true) // O JWT expirou
  //         if (!notificationDisplayedRef.current) {
  //           message.error(error.res.data.message)
  //           notificationDisplayedRef.current = true
  //         }
  //       }
  //     }
  //   }

  //   checkJwtStatus()
  // }, [])

  const getCurrentUser = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}api/users/me`
      )

      // Here we'll check if user is employee or employer
      const isEmployer = res.data.data?.userType === "employer"
      if (isEmployer) {
        const tempMenuItems = menuItems

        const employerMenuItems = {
          title: "Posted Jobs",
          path: "/jobs",
          icon: "ri-briefcase-4-line",
        }
        tempMenuItems[2] = employerMenuItems

        setMenuItems(tempMenuItems)
      }

      dispatch(setCurrentUser(res.data.data))
    } catch (error: any) {
      console.log(error)
      message.error(error.response.data.message || "Something went wrong")
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register" && !currentUser)
      getCurrentUser()
    console.log(pathname)
  }, [pathname])

  const onLogout = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.post("api/users/logout")
      message.success(res.data.message)
      router.push("/login")
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong")
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#164863",
              borderRadius: 10,

              // Alias Token
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          {isLoading && <Loading />}

          {/* If route is login or register, layout won't be shown */}
          {pathname === "/login" || pathname === "/register" ? (
            <div>{children}</div>
          ) : (
            currentUser && (
              <div className="layout-parent">
                <div
                  className={`sidebar ${!isSidebarExpanded && "items-center"}`}
                >
                  <div className="logo">
                    {isSidebarExpanded && <h1>OmegaJobs</h1>}
                    {!isSidebarExpanded && (
                      <i
                        className="ri-menu-3-line"
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                      ></i>
                    )}
                    {isSidebarExpanded && (
                      <i
                        className="ri-close-line"
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                      ></i>
                    )}
                  </div>
                  <div className="menu-items">
                    {menuItems?.map((item: any, i: number) => {
                      const isActive = pathname === item.path
                      return (
                        <div
                          key={i}
                          className={`menu-item ${
                            isActive ? "active-menu-item" : ""
                          }`}
                          onClick={() => router.push(item.path)}
                        >
                          <i className={item.icon}></i>
                          <span>{isSidebarExpanded && item.title}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="user-info">
                    {isSidebarExpanded && (
                      <div className="flex flex-col gap-2">
                        <span>{currentUser?.name}</span>
                        <span>{currentUser?.email}</span>
                      </div>
                    )}
                    <i className="ri-logout-box-r-line" onClick={onLogout}></i>
                  </div>
                </div>
                <div className="body">
                  {/* {jwtExpired && <h2>Your access expired, please login again</h2>} */}
                  {children}
                </div>
              </div>
            )
          )}
        </ConfigProvider>
      </body>
    </html>
  )
}
