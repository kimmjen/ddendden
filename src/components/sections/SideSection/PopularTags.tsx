interface Tag {
    id: number;
    name: string;
    count: number;
    isPopular: boolean;
}

interface PopularTagsProps {
    tags: Tag[];
}

export const PopularTags = ({ tags }: PopularTagsProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4">인기 태그</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <span
                        key={tag.id}
                        className={`
              px-3 py-1 rounded-full text-sm cursor-pointer
              ${tag.isPopular
                            ? 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
            `}
                    >
            {tag.name}
                        <span className="ml-1 text-xs opacity-60">
              {tag.count}
            </span>
          </span>
                ))}
            </div>
        </div>
    );
};