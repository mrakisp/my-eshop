"use client";

import {
  IconButton,
  AppBar,
  Toolbar,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Divider,
  List,
  CssBaseline,
  Drawer,
  Box,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./adminDrawer.module.css";

import { MenuItems } from "@/config/config";

export default function AdminDrawer() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const currentLink = parts[parts.length - 1];

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <div className={styles.navLeftArea}>View Site </div>
          <div className={styles.navRightArea}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer className={styles.sidebar} variant="permanent" anchor="left">
        <Divider />
        <Toolbar />
        <List>
          {MenuItems.map((menuItem) => (
            <div key={menuItem.value}>
              {menuItem.enabled && (
                <>
                  <Link href={"/admin/" + menuItem.value}>
                    <ListItem
                      key={menuItem.title}
                      disablePadding
                      className={
                        currentLink === menuItem.value ? styles.activeLink : ""
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>{menuItem.icon}</ListItemIcon>
                        <ListItemText primary={menuItem.title} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  {menuItem &&
                    menuItem.subMenu &&
                    menuItem.subMenu?.map((submenu) => (
                      <div key={submenu.title}>
                        {submenu.enabled && (
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
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
