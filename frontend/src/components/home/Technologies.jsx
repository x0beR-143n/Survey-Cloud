const Technologies = () => {
    const technologies = [
      { name: "React"},
      { name: "Tailwind CSS"},
      { name: "Node.js",},
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Công nghệ sử dụng</h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl mb-2">{tech.logo}</div>
                <span className="font-medium text-gray-800">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Technologies;