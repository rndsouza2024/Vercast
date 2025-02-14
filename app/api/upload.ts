import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set the limit to 10MB or any other appropriate value
    },
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Your existing code here
}

