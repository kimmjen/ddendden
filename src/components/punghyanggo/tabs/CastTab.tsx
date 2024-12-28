interface CastMember {
    avatar: string;
    name: string;
    role: string;
}

export const CAST_DATA: CastMember[] = [
    {
        avatar: "/images/punghyanggo/yoo.webp",
        name: "유재석",
        role: "MC"
    },
    {
        avatar: "/images/punghyanggo/ji.webp",
        name: "지석진",
        role: "MC"
    },
    {
        avatar: "/images/punghyanggo/hwang.webp",
        name: "황정민",
        role: "MC"
    },
    {
        avatar: "/images/punghyanggo/yang.webp",
        name: "양세찬",
        role: "MC"
    }
];

export const CastTab = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CAST_DATA.map((cast, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                        <img
                            src={cast.avatar}
                            alt={cast.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="font-medium">{cast.name}</h3>
                    <p className="text-sm text-gray-500">{cast.role}</p>
                </div>
            ))}
        </div>
    );
};