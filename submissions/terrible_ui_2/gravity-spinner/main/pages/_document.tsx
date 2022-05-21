import { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import { NextPage } from 'next';

const MyDocument: NextPage = ({}) =>  {

	return (
		<Html lang="en">
			<Head>{CssBaseline.flush()}</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default MyDocument;