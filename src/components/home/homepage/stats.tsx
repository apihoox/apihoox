export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "3K+",
      description: "HooX Executed",
    },
    {
      quantity: "35+",
      description: "Active HooX",
    },
    {
      quantity: "4",
      description: "Customers",
    },
    {
      quantity: "11000+",
      description: "Steps Executed",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              {" "}
              <span className="bg-gradient-to-b from-primary/80 to-primary text-transparent bg-clip-text">
                {quantity}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
