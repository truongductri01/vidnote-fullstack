import React from 'react'

function Tab(props: {
    tabs: Array<{ id: string, label: string }>,
    activeId: string,
    onClick: Function
}) {
    const { tabs, activeId, onClick } = props;
    return (
        <div className='Tab w-max min-h-[40px] flex mb-3'>
            {tabs.map(tab => <TabOption id={tab.id} label={tab.label} activeId={activeId} onClick={onClick} />)}
        </div>
    )
};

function TabOption({ id, label, activeId, onClick }: { id: string, label: string, activeId: string, onClick: Function }) {
    return <div
        key={id}
        className={`TabOption transition-all last:mr-0 cursor-pointer px-5 min-w-[120px] text-md font-bold hover:text-purple-700 text-center ${activeId === id ? "border-b-2 border-b-purple-400 text-purple-700" : ""}`}
        onClick={() => { onClick(id) }}
    >
        {label}
    </div>
}

export default Tab;