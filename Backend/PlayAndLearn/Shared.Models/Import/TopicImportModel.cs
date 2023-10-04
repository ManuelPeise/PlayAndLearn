using Shared.Models.Enums.Import;

namespace Shared.Models.Import
{
    public class TopicImportModel
    {
        public string TopicName { get; set; } = string.Empty;
        public TopicTypeEnum TopicType { get; set; }
    }
}
