import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheme } from '../features/themeSlice'
import { Loader2Icon } from 'lucide-react'
import { useUser, SignIn, useAuth, CreateOrganization} from '@clerk/clerk-react'
import { fetchWorkspaces } from '../features/workspaceSlice'
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { loading, workspaces } = useSelector((state) => state.workspace)
  const dispatch = useDispatch()
  const { user, isLoaded } = useUser()
  const {getToken} = useAuth()
  // ✅ HOOK MUST ALWAYS RUN
  useEffect(() => {
    dispatch(loadTheme())
  }, [])
  useEffect(() => {
    if(isLoaded && user && workspaces.length === 0){
      // dispatch(fetchWorkspaces(getToken()))
      dispatch(fetchWorkspaces({ getToken }))
    }
  }, [user, isLoaded])
  // 1️⃣ Clerk loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="size-7 text-blue-500 animate-spin" />
      </div>
    )
  }
   // 
  // 2️⃣ Not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SignIn />
      </div>
    )
  }

  // 3️⃣ Redux loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
        <Loader2Icon className="size-7 text-blue-500 animate-spin" />
      </div>
    )
  }
  
  if (user && workspaces.length === 0) {
    return (
      <div className=" items-center justify-center flex min-h-screen bg-white dark:bg-zinc-950">
        {/* <CreateOrganization />
        <CreateOrganization 
  afterCreateOrganizationUrl="/dashboard" 
/> */}
<CreateOrganization 
  afterCreateOrganizationUrl="/dashboard" 
  skipInvitationScreen={true} // Isse flow fast ho jayega
/>
      </div>
    )
  }
  return (
    <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen">
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 h-full p-6 xl:p-10 xl:px-16 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
