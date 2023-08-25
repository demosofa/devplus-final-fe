import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { Statistic } from 'antd';

import { CAMPAIGN } from '@enums';
import { CampaignType, ImPartial } from '@types';

const { Countdown } = Statistic;

export function CampaignCountdown({
	queryKey,
	campaign,
	onFinish,
}: {
	queryKey: QueryKey;
	campaign: ImPartial<CampaignType, 'id' | 'status' | 'expired_time'>;
	onFinish: (() => void) | undefined;
}) {
	const queryClient = useQueryClient();

	if (campaign.status == CAMPAIGN.INACTIVE) return <label>Expired</label>;

	return (
		<Countdown
			value={campaign.expired_time}
			format="DD : HH : mm : ss"
			onFinish={() => {
				queryClient.setQueryData<CampaignType[]>(queryKey, (lstCampaign) => {
					if (!lstCampaign || !lstCampaign.length) return [];

					const cloned = lstCampaign.concat();

					const idx = cloned.findIndex((item) => item.id === campaign.id);

					cloned[idx].status = CAMPAIGN.INACTIVE;

					return cloned;
				});

				onFinish?.();
			}}
		/>
	);
}
