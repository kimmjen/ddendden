import Image from 'next/image';

interface AwardCardProps {
    image: string;
    imageAlt: string;
    winner: string;
    works: string[];
    description: string;
}

export const AwardCard2 = ({ image, imageAlt, winner, works, description }: AwardCardProps) => {
    return (
        <div className="max-w-xl bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* 썸네일 영역 */}
            <div className="aspect-video relative group">
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="transform group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 468px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* 콘텐츠 영역 */}
            <div className="p-4">
                <div className="space-y-3">
                    <div className="flex gap-x-2 text-gray-600">
                        <span className="min-w-[65px] text-gray-400">수상자</span>
                        <span className="flex-1">{winner}</span>
                    </div>

                    <div className="flex gap-x-2 text-gray-600">
                        <ul className="list-disc list-inside text-gray-700">
                            {works.map((work, index) => (
                                <li key={index}>{work}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-x-2 text-gray-600">
                        <p className="text-gray-600">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};