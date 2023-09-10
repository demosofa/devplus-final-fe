import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { Statistic, Typography } from 'antd';

import { CAMPAIGN } from '@enums';
import { CampaignType, ImPartial } from '@types';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Countdown } = Statistic;

type Props = {
	className?: string;
	queryKey: QueryKey;
	campaign: ImPartial<CampaignType, 'status' | 'expired_time'>;
	onFinish?: () => void;
	[key: string]: any;
};

export function CampaignCountdown({
	queryKey,
	campaign,
	onFinish,
	...props
}: Props) {
	const queryClient = useQueryClient();

	if (campaign.status == CAMPAIGN.INACTIVE)
		return (
			<Title level={3} {...props}>
				{`Expired at ${dayjs(campaign.expired_time)}`}
			</Title>
		);

	return (
		<Countdown
			value={campaign.expired_time}
			format="DD : HH : mm : ss"
			onFinish={() => {
				queryClient.setQueryData<CampaignType | CampaignType[]>(
					queryKey,
					(campaigns) => {
						if (!campaigns) return undefined;

						if (campaigns instanceof Array) {
							const cloned = campaigns.concat();
							const idx = cloned.findIndex((item) => item.id === campaign.id);

							cloned[idx].status = CAMPAIGN.INACTIVE;

							return cloned;
						} else {
							campaigns.status = CAMPAIGN.INACTIVE;

							return campaigns;
						}
					}
				);

				onFinish?.();
			}}
			{...props}
		/>
	);
}
