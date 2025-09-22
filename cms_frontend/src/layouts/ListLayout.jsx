import { Alert, Skeleton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

import CardList from "../components/CardList.jsx";

const ListLayout = ({ title, description, items, renderCard, loading, error, emptyMessage }) => (
  <Stack spacing={4}>
    <Stack spacing={2} className="text-center md:text-left">
      <Typography variant="h3" className="font-semibold text-gray-900">
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" className="text-gray-600 max-w-3xl">
          {description}
        </Typography>
      )}
    </Stack>
    {error && <Alert severity="error">{error}</Alert>}
    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={320} animation="wave" />
        ))}
      </div>
    ) : (
      <CardList items={items} renderCard={renderCard} emptyMessage={emptyMessage} />
    )}
  </Stack>
);

ListLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  renderCard: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  emptyMessage: PropTypes.string,
};

ListLayout.defaultProps = {
  description: "",
  items: [],
  loading: false,
  error: "",
  emptyMessage: "No content available yet.",
};

export default ListLayout;
