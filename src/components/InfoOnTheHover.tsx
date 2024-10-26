import { motion } from "framer-motion";

const InfoOnTheHover: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute -mt-16  bg-white p-4 shadow-md transition duration-300"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h4 className="text-lg font-bold text-black">{title}</h4>
      <p className="text-sm text-gray-700">{description}</p>
    </motion.div>
  );
};

export default InfoOnTheHover;
