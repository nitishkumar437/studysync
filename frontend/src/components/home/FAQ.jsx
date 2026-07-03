import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is StudySync free to use?",
    answer:
      "Yes. StudySync is completely free for students. You can manage notes, tasks and your study planner without any cost.",
  },
  {
    question: "Can I access my data from different devices?",
    answer:
      "Yes. Since your data is stored securely in the cloud, you can log in from any device and continue where you left off.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use secure authentication and protected cloud storage to keep your information safe.",
  },
  {
    question: "Who can use StudySync?",
    answer:
      "Anyone can use it, but it is specially designed for students who want to stay organized and productive.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-gray-600">
            Everything you need to know about StudySync.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-semibold text-lg">{item.question}</span>

                <ChevronDown
                  className={`transition ${open === index ? "rotate-180" : ""}`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-5 text-gray-600 leading-7">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
