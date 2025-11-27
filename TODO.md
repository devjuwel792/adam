# TODO for User Management API Integration

- [ ] Create `src/store/services/userManagementApi.js` with RTK Query API slice including `getUsersList` endpoint for `/dashboard/users/list/`
- [ ] Update `src/Admin/UserManagement/UserManagement.jsx` to import and use `useGetUsersListQuery` hook
- [ ] Map API response fields to component structure (e.g., full_name to name, account_status to status)
- [ ] Add loading state handling in UserManagement.jsx
- [ ] Replace hardcoded users array with fetched data
- [ ] Handle error states if necessary
- [ ] Verify data displays correctly and matches sample output
