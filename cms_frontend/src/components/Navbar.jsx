import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "Blog", path: "/blog" },
  { label: "Events", path: "/events" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Notices", path: "/notices" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const renderLink = (link) => (
    <NavLink
      key={link.path}
      to={link.path}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
          isActive ? "bg-white text-blue-900" : "text-gray-100 hover:bg-blue-800"
        }`
      }
      onClick={() => setOpen(false)}
    >
      {link.label}
    </NavLink>
  );

  return (
    <AppBar position="sticky" color="primary" elevation={0} className="bg-blue-900/95 backdrop-blur">
      <Container maxWidth="lg">
        <Toolbar disableGutters className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-11 w-11 flex items-center justify-center rounded-full bg-amber-400 text-blue-900 font-bold shadow-md">
              GA
            </div>
            <div>
              <Typography variant="h6" className="text-white font-semibold tracking-wide">
                Geeta Aviation CMS
              </Typography>
              <Typography variant="caption" className="text-blue-100">
                Empowering aviation excellence
              </Typography>
            </div>
          </Link>
          <Box className="hidden md:flex items-center gap-2">{links.map(renderLink)}</Box>
          <Box className="md:hidden">
            <IconButton color="inherit" onClick={() => setOpen((prev) => !prev)}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>
        {open && (
          <Stack spacing={1.5} className="pb-4 md:hidden">
            {links.map((link) => (
              <Button
                key={link.path}
                component={NavLink}
                to={link.path}
                onClick={() => setOpen(false)}
                className="justify-start text-white"
                color="inherit"
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        )}
      </Container>
    </AppBar>
  );
};

export default Navbar;
