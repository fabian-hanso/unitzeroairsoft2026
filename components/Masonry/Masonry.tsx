export function Masonry() {
  const data = [
    {
      imageLink: "/Sia-Aktion.jpg",
    },
    {
      imageLink: "/Slider-Jan.jpg",
    },
    {
      imageLink: "/Sia-Nice.jpg",
    },
    {
      imageLink: "/Pascal-Stellung.jpg",
    },
    {
      imageLink: "/Pascal-Neu-Portrait.jpg",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },
    {
      imageLink:
        "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
    },
    {
      imageLink:
        "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {data.map(({ imageLink }, index) => (
        <div key={index}>
          <img
            className="h-full w-full max-w-full object-cover object-center"
            src={imageLink}
            alt="gallery-photo"
          />
        </div>
      ))}
    </div>
  );
}
