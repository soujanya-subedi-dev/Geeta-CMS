import { Container, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-blue-900 text-blue-50">
    <Container maxWidth="lg" className="py-10">
      <Stack direction={{ xs: "column", md: "row" }} spacing={6} className="justify-between">
        <Stack spacing={1}>
          <Typography variant="h6" className="font-semibold text-white">
            Geeta Aviation CMS
          </Typography>
          <Typography variant="body2" className="text-blue-100 max-w-md">
            A unified platform to manage blogs, events, testimonials, and notices with a modern,
            responsive experience for the Geeta Aviation community.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={4} className="text-sm uppercase tracking-wide">
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" className="text-blue-200">
              Sections
            </Typography>
            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>
            <Link to="/events" className="hover:text-white">
              Events
            </Link>
            <Link to="/testimonials" className="hover:text-white">
              Testimonials
            </Link>
            <Link to="/notices" className="hover:text-white">
              Notices
            </Link>
          </Stack>
        </Stack>
      </Stack>
      <Divider className="my-6 border-blue-800" />
      <Typography variant="caption" className="text-blue-200">
        © {new Date().getFullYear()} Geeta Aviation. All rights reserved.
      </Typography>
    </Container>
  </footer>
);

export default Footer;
