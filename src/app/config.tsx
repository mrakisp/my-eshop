import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const MenuItems = [
  {
    title: "Dashboard",
    value: "dashboard",
    icon: <DashboardIcon />,
    enabled: true,
  },
  {
    title: "Products",
    value: "products",
    icon: <InventoryIcon />,
    enabled: true,
  },
  {
    title: "New Product",
    value: "product",
    icon: <AddCircleOutlineIcon />,
    enabled: true,
  },
  {
    title: "New ",
    value: "products",
    icon: <InventoryIcon />,
    enabled: false,
    subMenu: [
      { title: "New Product", value: "newproducts", icon: <InventoryIcon /> },
    ],
  },
];
