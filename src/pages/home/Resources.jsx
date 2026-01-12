import { MdMenuBook, MdSchool, MdTipsAndUpdates, MdArticle } from "react-icons/md";

const Resources = () => {
    const resources = [
        {
            id: 1,
            title: "Effective Study Tips",
            description: "Master the art of learning with proven techniques to boost retention and understanding.",
            icon: <MdTipsAndUpdates size={32} className="text-primary" />,
            link: "#"
        },
        {
            id: 2,
            title: "Exam Preparation Guides",
            description: "Comprehensive guides to help you structure your revision and ace your exams.",
            icon: <MdMenuBook size={32} className="text-secondary" />,
            link: "#"
        },
        {
            id: 3,
            title: "Academic Blogs",
            description: "Stay updated with the latest trends, insights, and advice from educational experts.",
            icon: <MdArticle size={32} className="text-accent" />,
            link: "#"
        },
        {
            id: 4,
            title: "Learning Roadmaps",
            description: "Step-by-step pathways to mastering new subjects and skills efficiently.",
            icon: <MdSchool size={32} className="text-success" />,
            link: "#"
        }
    ];

    return (
        <section className="py-16 bg-base-100">
            <div className="container mx-auto px-6 md:px-10">
                <div className="text-center mb-12">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                        Educational Resources
                    </h2>
                    <p className="mt-4 text-gray-500 text-lg">
                        Empower your learning journey with our curated tools and guides.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resources.map((resource) => (
                        <div key={resource.id} className="card bg-base-200 hover:bg-base-100 transition-colors duration-300 shadow-sm border border-base-300">
                            <div className="card-body items-center text-center p-6">
                                <div className="w-16 h-16 rounded-full bg-base-100 flex items-center justify-center mb-4 shadow-sm">
                                    {resource.icon}
                                </div>
                                <h3 className="card-title text-xl font-bold text-base-content mb-2">{resource.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{resource.description}</p>
                                <div className="card-actions">
                                    <button className="btn btn-sm btn-outline btn-primary">Read More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Resources;
