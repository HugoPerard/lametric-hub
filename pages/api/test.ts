import type { NextApiRequest, NextApiResponse } from "next";
import { LaMetricData } from "../../utils/types";

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<LaMetricData>
) {
  res.status(200).json({
    frames: [
      {
        text: "test",
        icon: null,
      },
    ],
  });
}
