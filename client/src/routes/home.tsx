import BlogThumbnail from "../components/BlogThumbnail";

function Home() {
  return (
    <div className="page-container">
      <div className="home-welcome">
        <div className="welcome-container">
          <h1>BLAH-GING</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            iaculis est orci. In cursus, enim molestie congue tincidunt, neque
            lorem placerat nibh, sollicitudin congue lorem ex ut ante. Ut
            interdum nulla a erat sollicitudin lobortis. Aenean urna quam,
            accumsan commodo interdum sit amet, rhoncus vel elit. Morbi ipsum
            odio, feugiat eu lacinia nec, finibus non purus. Integer in sodales
            est. Etiam tempus nisi nec consectetur convallis. Vivamus porta
            dolor vitae lectus pretium, ac bibendum est sollicitudin. Proin
            condimentum dui sit amet orci faucibus pretium.
          </p>
          <p>
            Vivamus interdum faucibus libero, nec tristique erat pretium sed.
            Aenean ut est non lacus tempus sollicitudin. Nunc in nisl enim.
            Donec blandit, lorem porttitor finibus bibendum, magna nibh suscipit
            sapien, interdum facilisis turpis ipsum a tellus. Etiam id dapibus
            turpis, non consectetur nisl. Mauris tincidunt ullamcorper orci, et
            cursus nisi. Integer vel fermentum mauris. Sed sit amet purus neque.
            Aliquam erat volutpat.
          </p>
        </div>
      </div>
      <div className="home-container">
        <BlogThumbnail />
        <BlogThumbnail />
        <BlogThumbnail />
        <BlogThumbnail />
      </div>
    </div>
  );
}

export default Home;
