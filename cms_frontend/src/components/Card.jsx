import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Button, Card as MuiCard, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ title, subtitle, description, image, to, actionText = "View Details" }) => (
  <MuiCard className="rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <CardActionArea component={Link} to={to} className="flex flex-col h-full">
      {image && (
        <CardMedia component="img" height="200" image={image} alt={title} className="object-cover" loading="lazy" />
      )}
      <CardContent className="flex flex-col gap-4 flex-1">
        <Stack spacing={1}>
          {subtitle && (
            <Typography variant="caption" className="text-amber-500 font-semibold uppercase tracking-wider">
              {subtitle}
            </Typography>
          )}
          <Typography variant="h6" component="h3" className="font-semibold text-gray-900">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" className="text-gray-600 line-clamp-3">
              {description}
            </Typography>
          )}
        </Stack>
        <Button endIcon={<ArrowOutwardIcon />} color="primary" className="self-start" sx={{ mt: "auto" }}>
          {actionText}
        </Button>
      </CardContent>
    </CardActionArea>
  </MuiCard>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  to: PropTypes.string.isRequired,
  actionText: PropTypes.string,
};

export default Card;
