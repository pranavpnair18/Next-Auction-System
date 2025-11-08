

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
            <div className="flex flex-wrap justify-between bg-black ">
                <div>{notifications}</div>
            <div>{history}</div>
            <div>{feedback}</div>
            </div>
            
        </div>
    )
}