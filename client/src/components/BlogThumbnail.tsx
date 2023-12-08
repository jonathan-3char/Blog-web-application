function BlogThumbnail() {
  return (
    <div className="blog-container">
      <h2 className="blog-title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        iaculis est orci. In cursus, enim molestie congue tincidunt, neque lorem
        placerat nibh, sollicitudin congue lorem ex ut ante.
      </h2>
      <p className="preview-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        iaculis est orci. In cursus, enim molestie congue tincidunt, neque lorem
        iaculis est orci. In cursus, enim molestie congue tincidunt, neque lorem
      </p>
      <div className="horizontalInfo">
        <img
          width={30}
          height={30}
          src="https://tile.loc.gov/storage-services/service/pnp/ppmsc/04900/04921r.jpg"
          className="profile-image"
        />
        <span className="blog-author">
          <a href="/">Charles Rice</a>
        </span>
      </div>
      <div className="horizontalInfo">
        <span className="blog-date">Dec 2023</span>
      </div>
    </div>
  );
}

export default BlogThumbnail;
