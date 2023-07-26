import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export const MenuItems = [
  {
    title: "Dashboard",
    value: "dashboard",
    icon: <DashboardIcon />,
    enabled: true,
  },
  {
    title: "Orders",
    value: "orders",
    icon: <ReceiptIcon />,
    enabled: true,
  },
  {
    title: "Products",
    value: "products",
    icon: <InventoryIcon />,
    enabled: true,
    subMenu: [
      {
        title: "New Product",
        value: "/products/product",
        icon: <AddCircleOutlineIcon />,
        enabled: true,
      },
      {
        title: "Categories",
        value: "/products/categories",
        icon: <InventoryIcon />,
        enabled: true,
      },
      {
        title: "Attributes",
        value: "/products/attributes",
        icon: <InventoryIcon />,
        enabled: true,
      },
    ],
  },

  {
    title: "Users",
    value: "users",
    icon: <SupervisedUserCircleIcon />,
    enabled: true,
  },

  {
    title: "Test",
    value: "test",
    icon: <InventoryIcon />,
    enabled: false,
    subMenu: [
      {
        title: "Test Submenu",
        value: "testsubmenu",
        icon: <InventoryIcon />,
        enabled: false,
      },
    ],
  },
];
