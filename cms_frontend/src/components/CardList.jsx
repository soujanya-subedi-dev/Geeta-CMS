import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const CardList = ({ items, renderCard, emptyMessage }) => {
  if (!items.length) {
    return <p className="text-center text-gray-500 py-10">{emptyMessage}</p>;
  }

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.id || item.slug} item xs={12} sm={6} md={4}>
          {renderCard(item)}
        </Grid>
      ))}
    </Grid>
  );
};

CardList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderCard: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
};

CardList.defaultProps = {
  emptyMessage: "No records available yet.",
};

export default CardList;
