import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

interface ProductCombinationsProps {
  sizes: string[];
  colors: string[];
}

const ProductVariations: React.FC<ProductCombinationsProps> = ({
  sizes,
  colors,
}) => {
  const [combinations, setCombinations] = useState<string[]>([]);

  useEffect(() => {
    const generateCombinations = () => {
      const newCombinations: string[] = [];
      sizes.forEach((size) => {
        colors.forEach((color) => {
          newCombinations.push(`${size} ${color}`);
        });
      });
      setCombinations(newCombinations);
    };
    generateCombinations();
  }, [sizes, colors]);

  return (
    <Box>
      <Typography variant="h6">Combinations:</Typography>
      {combinations.map((combination, index) => (
        <Typography key={index} variant="body1">
          {combination}
        </Typography>
      ))}
    </Box>
  );
};

export default ProductVariations;

// import { useEffect, useState } from "react";
// import { Box, Typography, Divider } from "@mui/material";

// interface ProductVariationsProps {
//   size: string | null;
//   color: string | null;
// }

// export default function ProductVariations({
//   size,
//   color,
// }: ProductVariationsProps) {
//   const [combinations, setCombinations] = useState<string[]>([]);

//   useEffect(() => {
//     if (size && color) {
//       const newCombinations = generateCombinations(size, color);
//       setCombinations(newCombinations);
//     } else {
//       setCombinations([]);
//     }
//   }, [size, color]);

//   const generateCombinations = (size: string, color: string) => {
//     const combinations: string[] = [];

//     if (size === "small" || size === "medium") {
//       combinations.push(`${size} ${color}`);
//     }

//     return combinations;
//   };

//   return (
//     <Box>
//       <Divider />
//       <Typography variant="h6" gutterBottom>
//         Combinations:
//       </Typography>
//       <Box>
//         {combinations.length > 0 ? (
//           combinations.map((combination, index) => (
//             <Typography key={index}>{combination}</Typography>
//           ))
//         ) : (
//           <Typography>No combinations available.</Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }
