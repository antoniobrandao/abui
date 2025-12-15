import { ColumnData } from "@/registry/abui/marketing/animated-chart"

type DataItem = {
  maxValue: number
  columns: ColumnData[]
}

export const exampleData: DataItem[] = [
  {
    maxValue: 15,
    columns: [
      {
        title: "TV",
        appendString: "h/wk",
        value: 13.9,
        animationDelay: 0,
        // titleClassName: "text-blue-500",
        animationDuration: 1.4,
        // className: "bg-blue-50",
        // topBorderClassName: "border-blue-200",
        // valueClassName: "text-blue-500",
      },
      {
        title: "Social Media",
        appendString: "h/wk",
        value: 13.1,
        animationDelay: 0.3,
        animationDuration: 1.2,
        // titleClassName: "text-blue-500",
        // className: "bg-blue-50",
        // topBorderClassName: "border-blue-200",
        // valueClassName: "text-blue-500",
      },
      {
        title: "Mobile Games",
        appendString: "h/wk",
        value: 11.8,
        animationDelay: 0.6,
        animationDuration: 1,
        // className: "bg-pink-200",
        // titleClassName: "text-brand-pink",
        // topBorderClassName: "border-pink-500",
        // valueClassName: "text-pink-500",
      },
      {
        title: "Music / Podcasts",
        appendString: "h/wk",
        value: 10.3,
        animationDelay: 0.9,
        animationDuration: 0.8,
        // className: "bg-blue-50",
        // titleClassName: "text-blue-500",
        // topBorderClassName: "border-blue-200",
        // valueClassName: "text-blue-500",
      },
      {
        title: "News / Websites",
        appendString: "h/wk",
        value: 6.6,
        animationDelay: 1.2,
        animationDuration: 0.6,
        // className: "bg-blue-50",
        // titleClassName: "text-blue-500",
        // topBorderClassName: "border-blue-200",
        // valueClassName: "text-blue-500",
      },
    ],
  },
  {
    maxValue: 100,
    columns: [
      {
        title: "Gaming",
        appendString: "%",
        value: 100,
        animationDelay: 0,
        animationDuration: 1.2,
        // className: "bg-pink-200",
        // titleClassName: "text-brand-pink",
        // topBorderClassName: "border-pink-500",
        // valueClassName: "text-pink-500",
      },
      {
        title: "Online Video",
        appendString: "%",
        value: 86,
        animationDelay: 0.3,
        animationDuration: 1.2,
        // className: "bg-blue-50",
        // titleClassName: "text-blue-500",
        // topBorderClassName: "border-blue-200",
        // valueClassName: "text-blue-500",
      },
      {
        title: "Social Media",
        appendString: "%",
        value: 77,
        // className: "bg-blue-50",
        // titleClassName: "text-blue-500",
        // topBorderClassName: "border-blue-200",
        // valueClassName: "text-blue-500",
        animationDelay: 0.6,
        animationDuration: 1.2,
      },
    ],
  },
]
