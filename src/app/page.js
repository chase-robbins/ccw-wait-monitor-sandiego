"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Clock, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import getData from "@/app/api/getData";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "What is this? ❓",
    answer:
      "This is a tool to help you get a concealed carry weapons (CCW) permit in San Diego County. This graph represents the wait time to the soonest appointment available on the scheduling portal for San Diego CCW on any given day.",
  },
  {
    question: "Why are there large spikes down on the graph? 📉",
    answer:
      "Occasionally someone will cancel their appointment and a new appointment will open up, or sometimes the sheriff will make new dates available which get claimed fairly quickly.",
  },
  {
    question: "How is this data collected? 🔍",
    answer:
      "This data is collected automatically from the scheduling portal for San Diego CCW.",
  },
  {
    question: "How do I get a CCW in San Diego County? 🔫",
    answer:
      "Start here: https://www.sdsheriff.gov/i-want-to/get-a-permit-or-license/regulatory-licenses-and-fees/concealed-weapons-license",
  },
  {
    question: "I have a question about this data 🤔",
    answer: "Please email me! chase@chrv.fund",
  },
  {
    question: "Legal notes ⚖️",
    answer:
      "I'm not responsible for this data being accurate. It's provided AS IS. It might be wrong.",
  },
];

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        const formattedData = result.data.map((item) => ({
          timestamp: new Date(item.timestamp),
          waitTime: Math.round(
            (new Date(item["date-data"]) - new Date(item.timestamp)) /
              (1000 * 60 * 60 * 24)
          ),
        }));
        setData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const latestWaitTime =
    data.length > 0 ? data[data.length - 1].waitTime : null;
  const previousWaitTime =
    data.length > 1 ? data[data.length - 2].waitTime : null;
  const trend = latestWaitTime > previousWaitTime ? "up" : "down";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center p-4 space-y-8 font-sf-pro-display">
      {/* Logo Section */}
      <div className="w-full max-w-4xl flex items-center justify-center py-4">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]">
            CCW Wait Watchdog
          </h1>
        </div>
      </div>
      <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]">
            CCW Appointment Wait Time in San Diego 🔫
          </CardTitle>
          <CardDescription className="text-center text-lg mt-2 font-light">
            Current wait time trend over the past months
          </CardDescription>
        </CardHeader>
        <CardContent>
          {latestWaitTime !== null ? (
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Clock className="w-6 h-6 text-gray-600" />
              <span className="text-2xl font-semibold">
                {latestWaitTime} days
              </span>
              {trend === "up" ? (
                <TrendingUp className="w-6 h-6 text-red-500" />
              ) : (
                <TrendingDown className="w-6 h-6 text-green-500" />
              )}
            </div>
          ) : (
            <div className="text-center mb-6">Loading data...</div>
          )}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#0F2027" />
                    <stop offset="50%" stopColor="#203A43" />
                    <stop offset="100%" stopColor="#2C5364" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(tick) =>
                    tick.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "2-digit",
                    })
                  }
                  stroke="#6B7280"
                />
                <YAxis
                  label={{
                    value: "Wait Time (days)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#6B7280" },
                  }}
                  domain={[0, "dataMax + 20"]}
                  stroke="#6B7280"
                />
                <Tooltip
                  labelFormatter={(label) =>
                    label.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                  formatter={(value) => [`${value} days`, "Wait Time"]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="waitTime"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8, fill: "#EC4899" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]">
            Frequently Asked Questions 🤔
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full max-w-4xl bg-gray-100 border border-gray-200 rounded-lg p-6 mt-8 shadow-inner">
        <p className="text-sm text-gray-600 text-center leading-relaxed font-light">
          <strong className="font-semibold">Disclaimer:</strong> This website is
          not affiliated with, endorsed by, or in any way officially connected
          with the San Diego County Sheriff's Department or any of its
          subsidiaries or affiliates. The official San Diego County Sheriff's
          website can be found at{" "}
          <a
            href="https://www.sdsheriff.gov"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.sdsheriff.gov
          </a>
          . The information provided on this site is for general informational
          purposes only and should not be considered as official or legal
          advice.
        </p>
      </div>
    </div>
  );
}
