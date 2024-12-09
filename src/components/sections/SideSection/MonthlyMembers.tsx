import Image from 'next/image';
import { Crown} from 'lucide-react';

interface Member {
    rank: number;
    name: string;
    points: number;
    avatar: string;
}

interface MonthlyMembersProps {
    members: Member[];
}

export const MonthlyMembers = ({ members }: MonthlyMembersProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-purple-600" />
                    <h3 className="font-bold">이달의 계원</h3>
                </div>
                <span className="text-sm text-gray-500">2024년 3월</span>
            </div>
            <div className="space-y-4">
                {members.map(member => (
                    <div key={member.rank} className="flex items-center space-x-3 p-2 hover:bg-purple-50 rounded-lg">
                        <span className="text-lg font-bold text-purple-600 w-6">{member.rank}위</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                            <Image
                                src={member.avatar}
                                alt={member.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">활동점수 {member.points}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};