import React from 'react'
import { motion } from "motion/react";

const Details = ({question}:{question:any}) => {

      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        },
      };
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-lg overflow-hidden border-2 border-gray-600/90  "
    >
      <div className="p-6 bg-green-700 text-white">
        <h2 className="text-xl lg:text-2xl font-bold">{question.title}</h2>
      </div>
      <div className="p-6 bg-white">
        <p className="text-gray-700 text-lg">{question.content}</p>
      </div>
    </motion.div>
  );
}

export default Details