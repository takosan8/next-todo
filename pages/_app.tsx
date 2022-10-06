import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
