import { Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const DetailLayout = ({
  title,
  meta,
  image,
  content,
  links,
  loading,
  children,
}) => (
  <Stack spacing={4}>
    {loading ? (
      <Stack spacing={2}>
        <Skeleton variant="rounded" height={320} />
        <Skeleton variant="text" height={48} />
        <Skeleton variant="text" height={28} width="75%" />
      </Stack>
    ) : (
      <Stack spacing={4}>
        <Stack spacing={3} className="text-center md:text-left">
          <Typography variant="h3" className="font-semibold text-gray-900">
            {title}
          </Typography>
          {meta && meta.length > 0 && (
            <Stack direction="row" spacing={1} className="flex-wrap justify-center md:justify-start">
              {meta.map((item) => (
                <Chip key={item} label={item} color="primary" variant="outlined" className="bg-blue-50" />
              ))}
            </Stack>
          )}
        </Stack>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full rounded-3xl shadow-lg object-cover max-h-[480px]"
            loading="lazy"
          />
        )}
        {links && links.length > 0 && (
          <Stack direction="row" spacing={2} className="flex-wrap">
            {links.map(({ label, href }) => (
              <Button key={href} variant="contained" color="primary" component="a" href={href} target="_blank" rel="noopener">
                {label}
              </Button>
            ))}
          </Stack>
        )}
        <div className="prose prose-lg text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
        {children}
      </Stack>
    )}
  </Stack>
);

DetailLayout.propTypes = {
  title: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  content: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  children: PropTypes.node,
};

DetailLayout.defaultProps = {
  title: "",
  meta: [],
  image: "",
  content: "",
  links: [],
  loading: false,
  children: null,
};

export default DetailLayout;
