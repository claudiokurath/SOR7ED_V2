import React from 'react';

const branches = [
    { title: "MIND", desc: "Planning, routines, mental load", tasks: ["Turn messy list into plan", "Weekly reset checklist", "Summarise voice notes"], span: 1, image: "/7 Branches/mind.png" },
    { title: "WEALTH", desc: "Budgeting, bills, expenses", tasks: ["Track monthly spend", "Cancel subscriptions", "Find cheaper insurance"], span: 1, image: "/7 Branches/wealth.png" },
    { title: "BODY", desc: "Health, appointments, fitness", tasks: ["Book dentist", "Meal prep plan", "Find a gym"], span: 1, image: "/7 Branches/body.png" },
    { title: "TECH", desc: "Digital cleanup, passwords", tasks: ["Organise Drive", "Setup 1Password", "Unsubscribe emails"], span: 1, image: "/7 Branches/tech.png" },
    { title: "CONNECTION", desc: "Gifts, dates, social events", tasks: ["Birthday reminders", "Book date night", "Send thank yous"], span: 1, image: "/7 Branches/connection.png" },
    { title: "IMPRESSION", desc: "Personal brand, style", tasks: ["Update LinkedIn", "Find outfit for event", "Bio rewrite"], span: 1, image: "/7 Branches/impression.png" },
    { title: "GROWTH", desc: "Learning, career, skills", tasks: ["Course research", "Reading list summary", "Goal setting"], span: 2, image: "/7 Branches/growtfh.png" }
];

const Branches: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-black">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-20">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">AREAS OF FOCUS</p>
                    <h2 className="font-display font-bold text-6xl md:text-8xl text-white uppercase">The 7 Branches</h2>
                </div>

                <div className="branches-grid">
                    {branches.map((b, i) => (
                        <div key={b.title} className={`branch-card ${b.span === 2 ? 'lg:col-span-2' : ''}`}>
                            {/* Image Section */}
                            <img
                                src={b.image}
                                alt={b.title}
                                className="branch-card-image"
                            />

                            {/* Text Section */}
                            <div className="branch-card-content">
                                <div className="branch-meta">
                                    <span>Branch // 0{i + 1}</span>
                                </div>
                                <h3 className="branch-title">{b.title}</h3>
                                <p className="branch-subtitle">{b.desc}</p>

                                <ul className="branch-features">
                                    {b.tasks.map(t => (
                                        <li key={t}>
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Branches;
