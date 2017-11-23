import Admin from '@/components/actuator/Admin'
import AdminHome from '@/components/actuator/AdminHome'
import Health from '@/components/actuator/Health'
import Metrics from '@/components/actuator/Metrics'
import Environment from '@/components/actuator/Environment'
import Mappings from '@/components/actuator/Mappings'
import Beans from '@/components/actuator/Beans'
import ConfigProps from '@/components/actuator/ConfigProps'
import Loggers from '@/components/actuator/Loggers'
import Dump from '@/components/actuator/Dump'
import AutoConfig from '@/components/actuator/AutoConfig'
import Trace from '@/components/actuator/Trace'

export default [
  {
    path: '/admin',
    component: Admin,
    children: [
      {path: '', name: 'AdminHome', component: AdminHome},
      {path: 'health', name: 'Health', component: Health},
      {path: 'metrics', name: 'Metrics', component: Metrics},
      {path: 'env', name: 'Environment', component: Environment},
      {path: 'mappings', name: 'Mappings', component: Mappings},
      {path: 'beans', name: 'Beans', component: Beans},
      {path: 'configprops', name: 'Config-Props', component: ConfigProps},
      {path: 'loggers', name: 'Loggers', component: Loggers},
      {path: 'dump', name: 'Dump', component: Dump},
      {path: 'autoconfig', name: 'Auto-Config', component: AutoConfig},
      {path: 'trace', name: 'Trace', component: Trace}
    ]
  }
]
