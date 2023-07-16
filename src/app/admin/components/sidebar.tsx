import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import styles from "./sidebar.module.css";

import { MenuItems } from "@/config/config";

export default function SideBar() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer className={styles.akis} variant="permanent" anchor="left">
        <Divider />

        <List>
          {MenuItems.map((menuItem) => (
            <>
              {menuItem.enabled && (
                <>
                  <Link href={"/admin/" + menuItem.value}>
                    <ListItem key={menuItem.title} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>{menuItem.icon}</ListItemIcon>
                        <ListItemText primary={menuItem.title} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  {menuItem &&
                    menuItem.subMenu &&
                    menuItem.subMenu?.map((submenu) => (
                      <Link href={"/admin/" + submenu.value}>
                        <ListItem
                          key={submenu.title}
                          disablePadding
                          className={styles.submenu}
                        >
                          <ListItemButton>
                            <ListItemText primary={submenu.title} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                </>
              )}
            </>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
