import React from "react";
import MovieItem from "./type_movie/MovieItem";

const MovieList = (props) => {
  // console.log(props.trendingMovieData);
  // console.log(props.trendingMovieData);
  return (
    <div className="movieList-container">
      <MovieItem
        movieData={props.originalsMovieData}
        loading={props.loadingOriginal}
        error={props.errorOriginal}
        isTitle={false}
        isPoster={true} //true: hiển thị ảnh film dưới dạng poster
        isScroll={true} //true: hiển thị danh sách theo kiểu scroll ngang
      />

      <MovieItem
        movieData={props.trendingMovieData}
        loading={props.loadingTrending}
        error={props.errorTrending}
        isTitle={"Xu hướng"}
        isPoster={false} //false: hiển thị ảnh film dưới dạng backdrop
        isScroll={true}
      />

      <MovieItem
        movieData={props.topRatedMovieData}
        loading={props.loadingTopRated}
        error={props.errorTopRated}
        isTitle={"Xếp hạng cao"}
        isPoster={false} //false: hiển thị ảnh film dưới dạng backdrop
        isScroll={true}
      />

      <MovieItem
        movieData={props.actionMovieData}
        loading={props.loadingAction}
        error={props.errorAction}
        isTitle={"Hành động"}
        isPoster={false} //false: hiển thị ảnh film dưới dạng backdrop
        isScroll={true}
      />

      <MovieItem
        movieData={props.comedyMovieData}
        loading={props.loadingComedy}
        error={props.errorComedy}
        isTitle={"Hài"}
        isPoster={false} //false: hiển thị ảnh film dưới dạng backdrop
        isScroll={true}
      />

      <MovieItem
        movieData={props.horrorMovieData}
        loading={props.loadingHorror}
        error={props.errorHorror}
        isTitle={"Kinh dị"}
        isPoster={false} //false: hiển thị ảnh film dưới dạng backdrop
        isScroll={true}
      />

      <MovieItem
        movieData={props.romanceMovieData}
        loading={props.loadingRomance}
        error={props.errorRomance}
        isTitle={"Lãng mạn"}
        isPoster={false} //false: hiển thị ảnh film dưới dạng backdrop
        isScroll={true}
      />

      <MovieItem
        movieData={props.documentariesMovieData}
        loading={props.loadingDocumentaries}
        error={props.errorDocumentaries}
        isTitle={"Tài liệu"}
        isPoster={false} //false: hiển thị ảnh film dưới dạng backdrop
        isScroll={true}
      />
    </div>
  );
};

export default MovieList;
