import type { NextApiRequest, NextApiResponse } from "next";
import { LaMetricData } from "../../utils/types";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<LaMetricData>
) {
  try {
    const response = await fetch(
      "https://api.github.com/search/repositories?q=bearstudio+start+ui+web"
    );
    const data: { items: Array<{ name: string; stargazers_count: number }> } =
      await response.json();
    const startUiRepo = data?.items?.find(
      (item) => item.name === "start-ui-web"
    );
    res.status(200).json({
      frames: [
        {
          text: "Github stars",
          icon: 51380,
        },
        {
          text: `${startUiRepo?.stargazers_count}`,
          icon: null,
        },
        {
          text: "Thanks !",
          icon: null,
        },
      ],
    });
  } catch (error: any) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
}
