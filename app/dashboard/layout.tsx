

export default function DashboardLayout({
    children,
    notifications,
    history,
    feedback,
}: {
    children: React.ReactNode;
    notifications?: React.ReactNode;
    history?: React.ReactNode;
    feedback?: React.ReactNode;
}){
    return(
        <div className="min-h-screen">
            {/* main content */}
            <div>{children}</div>

            {/* parallel slots (rendered when the corresponding route exists) */}
            <div className="flex flex-col justify-normal bg-black gap-5">
                <div >{history}</div>
                <div >{notifications}</div>
            <div >{feedback}</div>
            </div>
            
        </div>
    )
}