import { Skeleton } from "@/components/ui/skeleton"
import { PropsData } from "../home-types"

type Props = {
    data: PropsData[] | undefined
}

export const SkeletonPosts = ({ data }: Props) => {
    return (
        <>
            {data ? (
                <>
                    {Array.from({ length: data.length }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col border border-gray-600 border-t-0 border-l-0 border-r-0 border-b-1 p-5 lg:p-2"
                        >
                            <div className="flex flex-row gap-2">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="flex flex-col justify-center">
                                    <Skeleton className="h-4 w-[250px] mb-2" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : null}

        </>
    )
}