// deps
import React from "react";
import Dynamic from "next/dynamic";

// import Script from "next/script";

// helpers
import { fetchCompetitions } from "@services/competition";

// components
import SEO from "@components/meta/SEO";
import Link from "next/link";
import HomeStyled from "./home/styled";
import EmptyLoading from "@components/preloaders/EmptyLoader";
import Loading from "@components/preloaders/GlobalLoader";
import CompetitionLoading from "@components/preloaders/CompetitionCardLoader";
import SubHeaderHome from "@components/headers/HomeSubHeader";
import SubHeaderTitle from "@components/headers/SubHeader";
import GAds from "@components/cards/GoogleAds";
import AddCompetitionButton from "@components/buttons/ButtonAddCompetition";

// split components
const CompetitionBox = Dynamic(import("@components/boxs/CompetitionBox"), {
  loading: () => <CompetitionLoading withContainer />,
});
const MediapartnerBox = Dynamic(import("@components/boxs/MediapartnerBox"), {
  loading: Loading,
});
const MediaPartnerAds = Dynamic(import("@components/cards/MediaPartnerAds"), {
  loading: EmptyLoading,
});

const Home = ({ serverData = {} }) => {
  // === initial states ===
  const [respCompPopular, setRespCompPopular] = React.useState({});
  const [respCompLatest, setRespCompLatest] = React.useState(
    serverData.competitionLatest
  );
  const [respCompManageByKI, setRespCompManageByKI] = React.useState({});
  const [respCompMP, setRespCompMP] = React.useState({});

  // === initial effects ===

  // componentDidMount
  React.useEffect(() => {
    doFetchData();
  }, []);

  // === initial functions ===

  const doFetchData = async () => {
    const ResponsePopular = await fetchCompetitions({
      query: { limit: 7, is_popular: true, status: "active" },
    });
    setRespCompPopular(ResponsePopular);

    const ResponseMP = await fetchCompetitions({
      query: { limit: 7, is_mediapartner: true },
    });
    setRespCompMP(ResponseMP);

    const ResponseManaged = await fetchCompetitions({
      query: { limit: 9, is_manage: true },
    });
    setRespCompManageByKI(ResponseManaged);
  };

  return (
    <HomeStyled>
      <SEO title={"Kompetisi Id - Platform Kompetisi Online Indonesia"}>
        <script
          src="https://unpkg.com/@glidejs/glide@3.3.0/dist/glide.min.js"
          async
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@glidejs/glide@3.3.0/dist/css/glide.core.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@glidejs/glide@3.3.0/dist/css/glide.theme.min.css"
        />
      </SEO>

      <div className="col-md-12">
        <GAds
          style={{ marginTop: 0, marginBottom: 50 }}
          key={`ads_key`}
          adClient="ca-pub-4468477322781117"
          adSlot={5218613800}
          timeout={1000}
          adTest
        />
      </div>

      {/* <Navbar /> */}
      <div
        style={{ marginTop: 50, borderBottom: "1px solid #e4e4e4" }}
        className="m-b-50"
      >
        <SubHeaderTitle
          title="Kompetisi Id"
          text="Platform online kompetisi, selalu ada hadiah tiap hari di Kompetisi.id."
        />
      </div>
      <div className="col-md-12">
        <SubHeaderHome slider={respCompPopular} />
      </div>

      {/* competition */}
      <AddCompetitionButton />
      <div className="m-b-50" style={{ borderBottom: "1px solid #e4e4e4" }}>
        <SubHeaderTitle
          title="Kompetisi Baru"
          text="Ikuti beragam kompetisi disini sesuai dengan minat kamu."
        />
      </div>

      <CompetitionBox subtitle={false} {...respCompLatest} />

      <div className="row align-center">
        <Link href="/browse?status=active">
          <a className="btn btn-bordergray">JELAJAH KOMPETISI</a>
        </Link>
      </div>

      <div className="m-b-50" />

      {/* competition manage by ki */}
      <div className="m-b-50" style={{ borderBottom: "1px solid #e4e4e4" }}>
        <SubHeaderTitle
          title="Kompetisi Manage oleh KI"
          text="Kompetisi yang bisa diikuti secara langsung di Kompetisi Id, cukup login dan klik join kompetisi."
        />
      </div>

      <CompetitionBox subtitle={false} {...respCompManageByKI} />

      {/* <div className="row align-center">
        <Link href="/browse?is_manage=true">
          <a className="btn btn-bordergray">JELAJAH KOMPETISI</a>
        </Link>
      </div> */}

      {/* media partners ads */}
      <div className="container">
        <div className="col-md-12">
          <MediaPartnerAds />
        </div>
      </div>

      {/* end of competition */}

      {/* <div className="m-b-50" /> */}

      {/* media partners ads */}
      {/* <div className="container">
        <div className="col-md-12">
          <MediaPartnerAds />
        </div>
      </div> */}

      {/* end of news */}

      <div className="m-b-50" />

      {/* media partner */}
      <MediapartnerBox {...respCompMP} />
    </HomeStyled>
  );
};

Home.getInitialProps = async (ctx) => {
  const competitionLatest = await fetchCompetitions({
    query: { limit: 9, status: "active" },
  });
  // const competitionManageByKI = await fetchCompetitions({
  //   query: { limit: 9, is_manage: 1 },
  // });
  // const newsLatest = await
  return {
    serverData: {
      competitionLatest,
      // competitionManageByKI,
    },
  };
};

export default Home;
