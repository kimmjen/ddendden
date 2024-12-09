// components/award/AwardCard.tsx
import { Award } from '@/types/award';
import Image from 'next/image';
import { cn } from "@/lib/utils";

interface AwardCardProps {
    award: Award;
    className?: string;
}

interface Winner {
    name?: string;
    members?: Array<{
        name: string;
        role?: string;
    }>;
    works?: string[];
    description?: string;
    votes?: {
        count?: number;
        percentage?: number;
    };
}

const MultipleWinnerContent = ({ winner }: { winner: Winner }) => {
    return (
        <div className="pb-4 border-b border-white/10 last:border-0">
            <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                    {winner.name ? (
                        <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                            {winner.name}
                        </span>
                    ) : winner.members && (
                        <div className="flex flex-wrap gap-2">
                            {winner.members.map((member, idx) => (
                                <span
                                    key={idx}
                                    className="text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
                                >
                                    {member.role ? `${member.name}[${member.role}]` : member.name}
                                    {winner?.members && idx !== winner.members.length - 1 && ", "}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                {winner.votes && (
                    <span className="text-sm text-white/60 ml-4">
                        {winner.votes.percentage}% ({winner.votes.count}표)
                    </span>
                )}
            </div>
            {winner.works && (
                <div className="space-y-2">
                    <h3 className="text-sm text-white/60 uppercase tracking-wider">작품</h3>
                    <ul className="space-y-1">
                        {winner.works.map((work, idx) => (
                            <li key={idx} className="text-sm pl-4 relative">
                                            <span
                                                className="absolute left-0 top-[7px] w-2 h-2 bg-white/20 rounded-full"/>
                                {work}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export const AwardCard = ({ award, className }: AwardCardProps) => {
    // 대상인 경우 특별한 스타일 적용
    const isDaesang = award.title === "대상";

    return (
        <div className={cn(
            "bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all hover:bg-white/10",
            className
        )}>
            {/* 헤더 영역 */}
            <div className="relative h-[300px] overflow-hidden">
                <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"/>
                <div className="absolute bottom-0 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className={cn(
                            "text-2xl font-bold",
                            isDaesang && "bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent"
                        )}>{award.title}</h2>
                        <span className="text-white/60 text-lg">{award.englishTitle}</span>
                    </div>
                    {award.votingMethod && (
                        <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80">
                            {award.votingMethod}
                        </span>
                    )}
                </div>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="p-6 text-white">
                {award.type === 'single' && award.winner && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span
                                className="text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                                {award.winner.name}
                            </span>
                            {award.winner.nicknames?.map((nickname, idx) => (
                                <span key={idx} className="text-sm text-white/60 italic">
                                    "{nickname}"
                                </span>
                            ))}
                        </div>
                        {award.winner.works && (
                            <div className="space-y-2">
                                <h3 className="text-sm text-white/60 uppercase tracking-wider">작품</h3>
                                <ul className="space-y-1">
                                    {award.winner.works.map((work, idx) => (
                                        <li key={idx} className="text-sm pl-4 relative">
                                            <span
                                                className="absolute left-0 top-[7px] w-2 h-2 bg-white/20 rounded-full"/>
                                            {work}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {award.winner.description && (
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <p className="text-sm text-white/80 italic leading-relaxed">
                                    "{award.winner.description}"
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {award.type === 'multiple' && (
                    <div className="space-y-6">
                        {award.winners ? (
                            // 여러 수상자가 있는 경우 (인기스타상 등)
                            award.winners.map((winner, idx) => (
                                <MultipleWinnerContent key={idx} winner={winner} />
                            ))
                        ) : award.winner?.members ? (
                            // 작품상처럼 한 작품에 여러 멤버가 있는 경우
                            <div className="space-y-4">
                                <div className="text-lg font-bold text-white mb-4">{award.winner.work}</div>
                                <div className="flex flex-wrap gap-2">
                                    {award.winner.members.map((member, idx) => (
                                        <span
                                            key={idx}
                                            className="text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
                                        >
                                            {member.role ? `${member.name}[${member.role}]` : member.name}
                                            {award.winner?.members && idx !== award.winner.members.length - 1 && ", "}
                                        </span>
                                    ))}
                                </div>
                                {award.winner.description && (
                                    <p className="text-sm text-white/80 mt-4">
                                        {award.winner.description}
                                    </p>
                                )}
                            </div>
                        ) : null}
                    </div>
                )}
                {award.type === 'special' && award.winner && (
                    <div className="text-center space-y-6">
                        {/* 수상자 이름 - 하트 이모지와 함께 크게 표시 */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                                {award.winner.name}
                            </div>
                        </div>

                        {/* 작품명 */}
                        {award.winner.works && (
                            <div className="text-lg text-white/80">
                                {award.winner.works.join(', ')}
                            </div>
                        )}

                        {/* 설명 - 큰 따옴표로 강조 */}
                        {award.winner.description && (
                            <div className="max-w-xl mx-auto">
                                <p className="text-xl text-white/90 italic">
                                    "{award.winner.description}"
                                </p>
                            </div>
                        )}

                        {/* 특이사항 - 하단에 작게 표시 */}
                        {award.winner.specialNote && (
                            <div className="mt-8 pt-4 border-t border-white/10">
                                <p className="text-sm text-white/60">
                                    {award.winner.specialNote}
                                </p>
                            </div>
                        )}
                    </div>
                )}
                {/* 추가 정보 */}
                {award.note && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-white/60">{award.note}</p>
                    </div>
                )}
            </div>
        </div>
    );
};