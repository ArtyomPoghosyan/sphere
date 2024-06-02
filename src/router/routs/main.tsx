import { Layout } from "@/components/layout/layout"
import { NotFound } from "@/components/not-found";

import { AddManager } from "@/pages/admin/manager/add-manager"
import { ChangePassword } from "@/pages/admin/manager/change-password"
import { ContentManagement } from "@/pages/admin/content-management/content-managment"
import { Dashboard } from "@/pages/admin/dashboard/dashboard"
import { EditManager } from "@/pages/admin/manager/edit-manager"
import { Manager } from "@/pages/admin/manager/manager"
import { Support } from "@/pages/admin/support/support"
import { SupportMessage } from "@/pages/admin/support/support-message"
import { TransferHistory } from "@/pages/admin/tranactions/transfer-history"
import { UpdateInfo } from "@/pages/admin/manager/update-info"
import { User } from "@/pages/admin/user/user"
import { Route, Routes, useLocation } from "react-router-dom"
import { ManagerPagesEnum } from "@/constants"
import { AddEdit } from "@/pages/admin/content-management/add-edit"

export const MainRouter: React.FC = () => {
  const location = useLocation();
  const { search } = location;
  const manager_tab_path_location = search.includes(`${ManagerPagesEnum.INFO_TAB}`);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<User />} />
        <Route path="managers">
          <Route index element={<Manager />} />
          <Route path="add" element={<AddManager />} />
          <Route path=":id/*" element={<EditManager />}>
            <Route index element={manager_tab_path_location ? <UpdateInfo /> : <ChangePassword />} />
          </Route>
        </Route>
        <Route path="support">
          <Route index element={<Support />} />
          <Route path=":id/*" element={<SupportMessage />} />
        </Route>
        <Route path="content-management">
          <Route index element={<ContentManagement />} />
          <Route path=":id" element={<AddEdit />} />
          <Route path="add-news" element={<AddEdit />} />
        </Route>
        <Route path="transfer-history" element={<TransferHistory />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}