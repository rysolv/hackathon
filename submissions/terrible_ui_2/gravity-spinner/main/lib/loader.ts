import { ImageLoader } from "next/image";

const loader: ImageLoader = ({src}) => {
	return src;
}

export { loader }