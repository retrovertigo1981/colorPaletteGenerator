import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { CardColorFavorite } from "../components/CardColorFavorite";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [favColors, setFavColors] = useState([]);
  const { user } = useAuth();
  console.log(user.login);
  useEffect(() => {
    const likedColors = localStorage.getItem("colorFormData");
    if (likedColors) {
      setFavColors(JSON.parse(likedColors));
    }
  }, []);

  const handleDeleteColor = (hex) => {
    const updatedColors = favColors.filter((color) => color.colorHex !== hex);
    setFavColors(updatedColors);
    localStorage.setItem("colorFormData", JSON.stringify(updatedColors));
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="-z-50 p-8 w-full  flex flex-col items-center md:grid md:grid-cols-4 gap-4">
        {favColors.map((color, index) => (
          <CardColorFavorite
            key={index}
            color={color.colorHex}
            colorName={color.colorName}
            onDelete={() => handleDeleteColor(color.colorHex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
