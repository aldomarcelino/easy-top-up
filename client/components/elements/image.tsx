import { Box, BoxProps } from "@mui/material";
import Image, { ImageProps } from "next/image";

interface ComponentImageProps extends BoxProps {
  src: string;
  alt: string;
  width: string | number;
  height: string | number;
  priority?: boolean;
  layout?: ImageProps["layout"];
  objectFit?: ImageProps["objectFit"];
}

const ComponentImage: React.FC<ComponentImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  layout = "fill",
  objectFit = "cover",
  ...props
}) => {
  return (
    <Box
      display="block"
      position="relative"
      width={width}
      height={height}
      data-testid="block-element"
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        layout={layout}
        objectFit={objectFit}
        loading={priority ? undefined : "lazy"}
      />
    </Box>
  );
};

export default ComponentImage;
