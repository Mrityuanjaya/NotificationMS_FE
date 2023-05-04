const routes = {
    HOME_ROUTE : "/",
    LOGIN_ROUTE : "/login",
    ADMIN_ROUTE : "/admins",
    INVITE_ROUTE : "/invite",
    DASHBOARD_ROUTE: "/dashboard",
    VERIFY_ROUTE : "/verify",
    CHANNELS_ROUTE : "/channels",
    CREATE_CHANNEL_ROUTE: "/create_channel",
    RECIPIENTS_ROUTE : "/recipients",
    REQUESTS_ROUTE : "/requests",
    NOTIFICATIONS_ROUTE : "/notifications",
    APPLICATIONS_ROUTE : "/applications",
    APPLICATIONSTABLE_ROUTE : "/applicationstable",
    USER_ROUTE:"/user/:user_id",
    EDIT_ADMIN_ROUTE:"/edit/:user_id",
    EDIT_CHANNEL_ROUTE:"/channel/:alias",
    ERROR_ROUTE :"*"
  };
  
  export default routes;