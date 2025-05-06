import { AppMainLayout } from "@/layouts/app-layout";
import { createContext, useContext, useState } from "react";

interface PageMetadata {
	title?: string;
	subtitle?: string;
	isbackable?: boolean;
	onBack?: () => void;
}

interface PageMetadataContextType extends PageMetadata {
	setPageMetadata: (data: Partial<PageMetadata>) => void;
}

const PageMetadataContext = createContext<PageMetadataContextType>({
	setPageMetadata: () => {}, 
});

const PageMetadataProvider = ({ children } : { children: React.ReactNode }) => {

	const [metadata, setPageMetadata] = useState<PageMetadata>({});

	return (
		<PageMetadataContext.Provider value={{ ...metadata, setPageMetadata}}>
			{children}
		</PageMetadataContext.Provider>
	);
};

export const usePageMetadata = () => useContext(PageMetadataContext);

export const PageMetadata = {
	usePageMetadata,
	Provider: PageMetadataProvider,
	AppMainLayout: AppMainLayout,
}